

// Using official standard:
// https://stackoverflow.com/a/1373724/3109222
const emailStandard = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
module.exports.isEmailValid = (email) => emailStandard.test(email.toLowerCase())


/**
 * Regex to validate password
 * (?=.*\d)          // should contain at least one digit
 * (?=.*[a-z])       // should contain at least one lower case
 * (?=.*[A-Z])       // should contain at least one upper case
 * [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
 *
 */
module.exports.isPasswordValid = (pass) => {
  const passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

  return passwordChecker.test(pass)

}

module.exports.stateIsValid = (state) => {
  const stateAbbreviations = [
 'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
 'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
 'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
 'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
 'VT','VI','VA','WA','WV','WI','WY'
]

  if (!(typeof state === 'string')) return false
  if (state.length !== 2) return false
  if (!(stateAbbreviations.includes(state.toUpperCase()))) return false
  return true
}