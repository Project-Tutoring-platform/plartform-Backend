const periodArrayForOneHour = []
for (let i = 18; i < 21; i++) {
  periodArrayForOneHour.push({
    start_time: `${i}:00`,
    end_time: `${i + 1}:00`,
    create_at: new Date(),
    update_at: new Date()
  })
}
for (let i = 18; i < 21; i++) {
  periodArrayForOneHour.push({
    start_time: `${i}:00`,
    end_time: `${i}:30`,
    create_at: new Date(),
    update_at: new Date()
  })
}
for (let i = 18; i < 21; i++) {
  periodArrayForOneHour.push({
    start_time: `${i}:30`,
    end_time: `${i + 1}:00`,
    create_at: new Date(),
    update_at: new Date()
  })
}

console.log(periodArrayForOneHour)