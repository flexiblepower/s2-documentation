# State of S2 session

![image](https://user-images.githubusercontent.com/851310/205604844-4b65ca5c-a2b6-4d3f-9434-bd17d65341ff.png)


| State | Messages that can be sent by CEM /received by RM | Messages that can be sent by RM / received by CEM |
| --- | --- | --- |
| WebSocket Connected | Handshake HandshakeResponse ReceptionStatus | Handshake ReceptionStatus |
| Initialized | SelectControlType SessionRequest ReceptionStatus | ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |
| ControlType PEBC activated | PEBC.Instruction SelectControlType SessionRequest ReceptionStatus | PEBC.EnergyConstraint PEBC.PowerConstraint RevokeObject InstructionStatusUpdate ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |
| ControlType PPBC activated | PPBC.EndInterrptionInstruction PPBC.ScheduleInstruction PPBC.StartInterruptionInstruction SelectControlType SessionRequest ReceptionStatus | PPBC.PowerProfileDefinition PPBC.PowerPorfileStatus RevokeObject InstructionStatusUpdate ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |
| ControlType OMBC activated | OMBC.Instruction SelectControlType SessionRequest ReceptionStatus | OMBC.Status OMBC.SystemDescription OMBC.TimerStatus RevokeObject InstructionStatusUpdate ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |
| ControlType FRBC activated | FRBC.Instruction SelectControlType SessionRequest ReceptionStatus | FRBC.ActuatorStatus FRBC.FillLevelTargetProfile FRBC.LeakageBehaviour FRBC.StorageStatus FRBC.SystemDescription FRBC.UsageForecast FRBC.TimerStatus RevokeObject InstructionStatusUpdate ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |
| ControlType DDBC activated | DDBC.Instruction SelectControlType SessionRequest ReceptionStatus | DDBC.ActuatorStatus DDBC.AverageDemandRateForecast DDBC.SystemDescription DDBC.TimerStatus RevokeObject InstructionStatusUpdate ResourceManagerDetails PowerMeasurement PowerForecast SessionRequest ReceptionStatus |