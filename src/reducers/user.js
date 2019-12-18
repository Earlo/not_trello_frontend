export default function user(state = 'Anonymous', action) {
  switch (action.type) {
    case 'RENAME':
      return action.text;
    default:
      return state;
  }
}
