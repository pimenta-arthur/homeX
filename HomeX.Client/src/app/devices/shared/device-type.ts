export interface IDeviceType {
  name: string;
  icon: string;
}

export enum DeviceType {
  Light,
  Door,
  Temperature,
  Power,
  Occupancy
}

export namespace DeviceType {
  let _type: IDeviceType;

  export function propertiesOf(type: DeviceType) {
    switch (type) {
      case DeviceType.Light:
        _type = {
          name: "light",
          icon: "wb_incandescent"
        };
        return _type;
      case DeviceType.Door:
        _type = {
          name: "door",
          icon: "meeting_room"
        };
        return _type;
      case DeviceType.Temperature:
        _type = {
          name: "temperature",
          icon: "opacity"
        };
        return _type;
      case DeviceType.Power:
        _type = {
          name: "power",
          icon: "power"
        };
        return _type;
      case DeviceType.Occupancy:
        _type = {
          name: "occupancy",
          icon: "transfer_within_a_station"
        };
        return _type;
      default:
        _type = {
          name: "",
          icon: ""
        };
        return _type;
    }
  }

  export function getTypes() {
    const devices = [
      propertiesOf(DeviceType.Light),
      propertiesOf(DeviceType.Door),
      propertiesOf(DeviceType.Occupancy),
      propertiesOf(DeviceType.Power),
      propertiesOf(DeviceType.Temperature)
    ];
    return devices;
  }
}
