export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const random = (min, max) => Math.random() * (max - min) + min
