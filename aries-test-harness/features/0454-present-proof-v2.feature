@RFC0454 @AIP20
Feature: RFC 0454 Aries agent present proof v2

   @T001-RFC0454 @critical @AcceptanceTest @DIDExchangeConnection
   Scenario Outline: Present Proof of specific types and proof is acknowledged with a Drivers License credential type with a DID Exchange Connection
      Given "2" agents
         | name  | role     |
         | Faber | verifier |
         | Bob   | prover   |
      And "Faber" and "Bob" have an existing connection
      And "Bob" has an issued credential with formats from <issuer> with <credential_data>
      When "Faber" sends a <request_for_proof> presentation with formats to "Bob"
      And "Bob" makes the <presentation> of the proof with formats
      And "Faber" acknowledges the proof with formats
      Then "Bob" has the proof with formats verified

      @CredFormat_Indy @RFC0592 @Schema_DriversLicense_v2 @CredProposalStart
      Examples:
         | issuer | credential_data   | request_for_proof               | presentation                   |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2     | presentation_DL_address_v2     |
         | Faber  | Data_DL_MaxValues | proof_request_DL_age_over_19_v2 | presentation_DL_age_over_19_v2 |

      @CredFormat_JSON-LD @RFC0510 @Schema_DriversLicense_v2 @CredProposalStart @ProofType_Ed25519Signature2018 @DidMethod_key
      Examples:
         | issuer | credential_data   | request_for_proof                  | presentation                      |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2_dif_pe | presentation_DL_address_v2_dif_pe |

      @CredFormat_JSON-LD @RFC0510 @RFC0646 @Schema_DriversLicense_v2 @CredProposalStart @ProofType_BbsBlsSignature2020 @DidMethod_key
      Examples:
         | issuer | credential_data   | request_for_proof                                   | presentation                      |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2_dif_pe_limit_disclosure | presentation_DL_address_v2_dif_pe |

      @CredFormat_JSON-LD @RFC0510 @Schema_DriversLicense_v2 @CredProposalStart @ProofType_Ed25519Signature2018 @DidMethod_orb
      Examples:
         | issuer | credential_data   | request_for_proof                  | presentation                      |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2_dif_pe | presentation_DL_address_v2_dif_pe |

      @CredFormat_JSON-LD @RFC0510 @RFC0646 @Schema_DriversLicense_v2 @CredProposalStart @ProofType_BbsBlsSignature2020 @DidMethod_orb
      Examples:
         | issuer | credential_data   | request_for_proof                                   | presentation                      |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2_dif_pe_limit_disclosure | presentation_DL_address_v2_dif_pe |

      @CredFormat_JSON-LD @RFC0510 @Schema_DriversLicense_v2 @CredProposalStart @ProofType_Ed25519Signature2018 @DidMethod_sov
      Examples:
         | issuer | credential_data   | request_for_proof                  | presentation                      |
         | Acme   | Data_DL_MaxValues | proof_request_DL_address_v2_dif_pe | presentation_DL_address_v2_dif_pe |


   @T002-RFC0454 @RFC0510 @critical @AcceptanceTest @DIDExchangeConnection @CredFormat_JSON-LD @Schema_Citizenship_Context @CredProposalStart
   Scenario Outline: Present Proof of specific types and proof is acknowledged with a Citizenship credential type with a DID Exchange Connection
      Given "2" agents
         | name  | role     |
         | Faber | verifier |
         | Bob   | prover   |
      And "Faber" and "Bob" have an existing connection
      And "Bob" has an issued credential with formats from <issuer> with <credential_data>
      When "Faber" sends a <request_for_proof> presentation with formats to "Bob"
      And "Bob" makes the <presentation> of the proof with formats
      And "Faber" acknowledges the proof with formats
      Then "Bob" has the proof with formats verified

      @ProofType_Ed25519Signature2018 @DidMethod_key
      Examples:
         | issuer | credential_data  | request_for_proof                | presentation                    |
         | Acme   | Data_Citizenship | proof_request_citizenship_dif_pe | presentation_citizenship_dif_pe |

      @RFC0646 @ProofType_BbsBlsSignature2020 @DidMethod_key
      Examples:
         | issuer | credential_data  | request_for_proof                                 | presentation                    |
         | Acme   | Data_Citizenship | proof_request_citizenship_dif_pe_limit_disclosure | presentation_citizenship_dif_pe |

      @ProofType_Ed25519Signature2018 @DidMethod_orb
      Examples:
         | issuer | credential_data  | request_for_proof                | presentation                    |
         | Acme   | Data_Citizenship | proof_request_citizenship_dif_pe | presentation_citizenship_dif_pe |

      @RFC0646 @ProofType_BbsBlsSignature2020 @DidMethod_orb
      Examples:
         | issuer | credential_data  | request_for_proof                                 | presentation                    |
         | Acme   | Data_Citizenship | proof_request_citizenship_dif_pe_limit_disclosure | presentation_citizenship_dif_pe |

      @ProofType_Ed25519Signature2018 @DidMethod_sov
      Examples:
         | issuer | credential_data  | request_for_proof                | presentation                    |
         | Acme   | Data_Citizenship | proof_request_citizenship_dif_pe | presentation_citizenship_dif_pe |
