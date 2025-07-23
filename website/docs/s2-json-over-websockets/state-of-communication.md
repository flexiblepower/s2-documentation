---
title: "States of Communication"
---

# State of S2 session

![image](/img/state_of_communication.png)


| State | Messages that can be sent by CEM /received by RM | Messages that can be sent by RM / received by CEM |
| --- | --- | --- |
| WebSocket Connected | Handshake <br/> HandshakeResponse <br/> ReceptionStatus | Handshake <br/> ReceptionStatus |
| Initialized | SelectControlType <br/> SessionRequest <br/> ReceptionStatus | ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |
| ControlType PEBC activated | PEBC.Instruction <br/> SelectControlType <br/> SessionRequest <br/> ReceptionStatus | PEBC.EnergyConstraint <br/> PEBC.PowerConstraint <br/> RevokeObject <br/> InstructionStatusUpdate <br/> ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |
| ControlType PPBC activated | PPBC.EndInterrptionInstruction <br/> PPBC.ScheduleInstruction <br/> PPBC.StartInterruptionInstruction <br/> SelectControlType <br/> SessionRequest <br/> ReceptionStatus | PPBC.PowerProfileDefinition <br/> PPBC.PowerPorfileStatus <br/> RevokeObject InstructionStatusUpdate <br/> ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |
| ControlType OMBC activated | OMBC.Instruction <br/> SelectControlType <br/> SessionRequest <br/> ReceptionStatus | OMBC.Status <br/> OMBC.SystemDescription <br/> OMBC.TimerStatus <br/> RevokeObject <br/> InstructionStatusUpdate <br/> ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |
| ControlType FRBC activated | FRBC.Instruction <br/> SelectControlType <br/> SessionRequest <br/> ReceptionStatus | FRBC.ActuatorStatus <br/> FRBC.FillLevelTargetProfile <br/> FRBC.LeakageBehaviour <br/> FRBC.StorageStatus <br/> FRBC.SystemDescription <br/> FRBC.UsageForecast <br/> FRBC.TimerStatus <br/> RevokeObject <br/> InstructionStatusUpdate <br/> ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |
| ControlType DDBC activated | DDBC.Instruction <br/> SelectControlType <br/> SessionRequest <br/> ReceptionStatus | DDBC.ActuatorStatus <br/> DDBC.AverageDemandRateForecast <br/> DDBC.SystemDescription <br/> DDBC.TimerStatus <br/> RevokeObject <br/> InstructionStatusUpdate <br/> ResourceManagerDetails <br/> PowerMeasurement <br/> PowerForecast <br/> SessionRequest <br/> ReceptionStatus |