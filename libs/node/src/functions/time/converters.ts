export const converters = {
  fromSecond: (time: number) => 1000 * time,
  fromMinute: (time: number) => 60 * converters.fromSecond(time),
  fromHour: (time: number) => 60 * converters.fromMinute(time),
  fromDay: (time: number) => 24 * converters.fromHour(time)
} as const;
