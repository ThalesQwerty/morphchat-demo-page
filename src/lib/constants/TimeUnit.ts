export enum TimeUnit {
    seconds = 1000,
    minutes = 60 * TimeUnit.seconds,
    hours = 60 * TimeUnit.minutes,
    days = 24 * TimeUnit.hours,
    weeks = 7 * TimeUnit.days,
    months = 30 * TimeUnit.days,
    years = 365.25 * TimeUnit.days,
}