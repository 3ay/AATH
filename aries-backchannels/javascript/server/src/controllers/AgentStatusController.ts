import { $log, BodyParams, Controller, Get, Post, Res } from '@tsed/common'
import packageJson from '@aries-framework/core/package.json'
import { TestHarnessConfig, Transport } from '../TestHarnessConfig'
import { BaseController } from '../BaseController'

@Controller('/agent/command')
export class AgentStatusController extends BaseController {
  public constructor(testHarnessConfig: TestHarnessConfig) {
    super(testHarnessConfig)
  }

  @Get('/status')
  getStatus(@Res() response: Res) {
    // NOTE: Because the agent runs inside the backchannel (not separate processes)
    // The agent is active as long as the backchannel is active
    const active = true

    if (!active) {
      response.status(418)
      return {
        status: 'inactive',
      }
    }

    return {
      status: 'active',
    }
  }

  @Get('/version')
  getVersion(@Res() response: Res) {
    $log.info('Get Version')
    const [version] = packageJson.version.split('+')
    return version
  }

  @Post('/agent/start')
  async restartAgent(@BodyParams('data') data: StartAgentData) {
    await this.testHarnessConfig.stopAgent()

    await this.testHarnessConfig.startAgent({
      inboundTransports: data.parameters.inbound_transports ?? ['http'],
      outboundTransports: data.parameters.outbound_transports ?? ['http'],
    })

    await this.testHarnessConfig.agentStartup()
  }
}

interface StartAgentData {
  parameters: {
    'mime-type'?: string
    inbound_transports?: Transport[]
    outbound_transports?: Transport[]
  }
}
