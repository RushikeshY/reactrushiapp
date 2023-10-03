export default class StringValidator {
  mobileRegex = /^\+?\d{10,12}$/;
  emailRegex = /^[a-zA-Z][a-zA-Z.0-9]*@[a-zA-Z]\w*\.[a-zA-Z]+$/;
  constructor({ isMobile, isEmail, minLength, maxLength, error }) {
    this.isMobile = isMobile;
    this.isEmail = isEmail;
    this.minLength = minLength;
    this.maxLength = maxLength;
    if(error) this.error = error;
  }
  /**
   * @param {string} s
   */
  error(s) {
    if (this.minLength !== undefined && s.length < this.minLength) {
      if (!s) return `Required`;
      return `Length should be atleast ${this.minLength}`;
    }
    if (this.maxLength !== undefined && s.length > this.maxLength)
      return `Length should be atmost ${this.maxLength}`;
    if (this.isMobile !== undefined && !this.mobileRegex.test(s))
      return `Not a valid mobile number`;
    if (this.isEmail !== undefined && !this.emailRegex.test(s))
      return `Not a valid email address`;
    return "";
  }
}

export const MobileNumberValidator = new StringValidator({ isMobile: true });
export const EmailValidator = new StringValidator({ isEmail: true });
