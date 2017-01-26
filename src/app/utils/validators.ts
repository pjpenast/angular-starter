import { FormControl } from '@angular/forms';

export function ValidateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i

  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  }
}

export function ValidateArray(c: FormControl) {

  if (!c.value.length) {
    return {
      validateArray: { valid: false }
    }
  }

}

export function ValidateCode(c: FormControl) {
  let Code_REGEXP = /com\.[a-z]+\.[a-z]+/

  return Code_REGEXP.test(c.value) ? null : {
    validateCode: {
      valid: false
    }
  }

}


export function ValidateUrl(c: FormControl) {
  let URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  return URL_REGEXP.test(c.value) ? null : {
    validateUrl: {
      valid: false
    }
  }

}
