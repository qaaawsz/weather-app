export type DayForecastType = {
    Date: string
    Day: {
        Icon: number
    }
    Temperature: {
        Minimum: {
            Value: number
            Unit: string
        }
        Maximum: {
            Value: number
            Unit: string
        }
    },
    WeatherIcon: number
}

export type DailyCardType = {
    day: DayForecastType
    temperatureUnit: boolean
}

export type WeatherCardType = {
    LocalObservationDateTime: string
    Temperature: {
        Imperial: {
            Unit: string
            Value: number
        }
        Metric: {
            Unit: string
            Value: number
        }
    }
    TemperatureSummary: {
        Past12HourRange: {
            Maximum: {
                Imperial: {
                    Unit: string
                    Value: number
                }
                Metric: {
                    Unit: string
                    Value: number
                }
            }
            Minimum: {
                Imperial: {
                    Unit: string
                    Value: number
                }
                Metric: {
                    Unit: string
                    Value: number
                }
            }
        }
    }
    WeatherText: string
}

export type FavouriteCardType = {
    id: number
    cityName: string
}
