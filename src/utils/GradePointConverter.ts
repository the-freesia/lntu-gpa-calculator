export function level2Point(level: string) {
  switch (level) {
    case '优秀':
      return 4.5
    case '良':
      return 3.5
    case '合格':
      return 3.5
    case '中':
      return 2.5
    case '及格':
      return 1.5
    default:
      return 0
  }
}

export function level2Score(level: string) {
  switch (level) {
    case '优秀':
      return 95
    case '良':
      return 85
    case '合格':
      return 85
    case '中':
      return 75
    case '及格':
      return 60
    default:
      return 0
  }
}

export function score2Point(score: number) {
  if (score >= 95) {
    return 4.5
  } else if (score >= 90) {
    return 4.0
  } else if (score >= 85) {
    return 3.5
  } else if (score >= 80) {
    return 3.0
  } else if (score >= 75) {
    return 2.5
  } else if (score >= 70) {
    return 2.0
  } else if (score >= 65) {
    return 1.5
  } else if (score >= 60) {
    return 1.0
  } else {
    return 0
  }
}

export function GradePointConvert2Score(gradePoint: number) {
  switch (gradePoint) {
    case 4.5:
      return 95
    case 4:
      return 90
    case 3.5:
      return 85
    case 3:
      return 80
    case 2.5:
      return 75
    case 2:
      return 70
    case 1.5:
      return 65
    case 1.0:
      return 60
    default:
      return 0
  }
}
