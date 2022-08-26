let tests = [
  {
    title: 'Rules of Baseball',
    text: 'Baseball has no rules. It is a chaos sport.',
    _id: 1
  },
  {
    title: 'Lions',
    text: 'Lions are cute and you should for sure try to pet one if you see it.',
    _id: 2
  }
]

export function getTest(_id) {
  return tests.find((test) => test._id === _id)
}

export default function getTests() {
  return tests
}
