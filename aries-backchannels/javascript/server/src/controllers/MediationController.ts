import { Controller, Get, PathParams, Post, BodyParams } from '@tsed/common'
import { NotFound, NotImplemented } from '@tsed/exceptions'
import {
  MediationRecord,
  MediationState,
  MediationRole,
  MediationRepository,
  RoutingEventTypes,
  MediationStateChangedEvent,
} from '@aries-framework/core'
import { TestHarnessConfig } from '../TestHarnessConfig'
import { BaseController } from '../BaseController'
import { filter, firstValueFrom, ReplaySubject, timeout } from 'rxjs'

@Controller('/agent/command/mediation')
export class MediationController extends BaseController {
  private subject = new ReplaySubject<MediationStateChangedEvent>()

  public constructor(testHarnessConfig: TestHarnessConfig) {
    super(testHarnessConfig)
  }

  public onStartup(): void | Promise<void> {
    const observable = this.agent.events.observable<MediationStateChangedEvent>(RoutingEventTypes.MediationStateChanged)

    // Catch all events in replay subject for later use
    this.subject = new ReplaySubject<MediationStateChangedEvent>()
    observable.subscribe(this.subject)

    // Initiate message pickup whenever mediation is completed
    observable.subscribe(async (event) => {
      if (
        event.payload.mediationRecord.role === MediationRole.Recipient &&
        event.payload.mediationRecord.state === MediationState.Granted
      ) {
        await this.agent.mediationRecipient.initiateMessagePickup(event.payload.mediationRecord)
      }
    })
  }

  @Get('/:connectionId')
  async getMediationRecordByConnectionId(@PathParams('connectionId') connectionId: string) {
    const mediationRecord = await this.agent.mediationRecipient.findByConnectionId(connectionId)

    if (!mediationRecord) {
      throw new NotFound(`mediation record for connectionId "${connectionId}" not found.`)
    }

    return this.mapMediationRecord(mediationRecord)
  }

  @Post('/send-request')
  async sendMediationRequest(@BodyParams('id') connectionId: string) {
    const connection = await this.agent.connections.findById(connectionId)

    if (!connection) {
      throw new NotFound(`connection record with id "${connectionId}" not found.`)
    }

    const mediationRecord = await this.agent.mediationRecipient.requestMediation(connection)

    // FIXME: temporary until https://github.com/hyperledger/aries-framework-javascript/pull/661 is merged
    mediationRecord.role = MediationRole.Recipient
    const mediationRepository = this.agent.injectionContainer.resolve(MediationRepository)
    await mediationRepository.update(mediationRecord)

    return this.mapMediationRecord(mediationRecord)
  }

  @Post('/send-grant')
  async sendMediationGrant(@BodyParams('id') connectionId: string) {
    let {
      payload: { mediationRecord },
    } = await this.waitForState(connectionId, MediationState.Granted)

    // Auto accept is enabled, so we're not granting the mediation explicitly
    return this.mapMediationRecord(mediationRecord)
  }

  @Post('/send-deny')
  async sendMediationDeny(@BodyParams('id') connectionId: string) {
    throw new NotImplemented('Sending mediation deny message not supported in AFJ')
  }

  private async waitForState(connectionId: string, state: MediationState) {
    return await firstValueFrom(
      this.subject.pipe(
        filter((e) => e.payload.mediationRecord.connectionId === connectionId),
        filter((e) => e.payload.mediationRecord.state === state),
        timeout(20000)
      )
    )
  }

  private mapMediationRecord(mediationRecord: MediationRecord) {
    return {
      state: mediatorStateMapping[mediationRecord.role][mediationRecord.state],
      connection_id: mediationRecord.connectionId,
    }
  }
}

const mediatorStateMapping = {
  [MediationRole.Mediator]: {
    [MediationState.Requested]: 'request-received',
    [MediationState.Granted]: 'grant-sent',
    [MediationState.Denied]: 'deny-sent',
  },
  [MediationRole.Recipient]: {
    [MediationState.Requested]: 'request-sent',
    [MediationState.Granted]: 'grant-received',
    [MediationState.Denied]: 'deny-received',
  },
}
