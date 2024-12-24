import bcrypt from 'bcrypt'
import pick from 'lodash/pick'

export const generateSalt = async () => {
  return await bcrypt.genSalt()
}

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  const encryptEnteredPassword = await generatePassword(enteredPassword, salt)
  return encryptEnteredPassword === savedPassword
}

export const getInfoData = ({ fields = [], object = {} }: { fields: string[]; object: any }) => {
  return pick(object, fields)
}

export const getSelectData = (select: string[]) => {
  return Object.fromEntries(select.map((item) => [item, 1]))
}

export const getUnSelectData = (unselect: string[]) => {
  return Object.fromEntries(unselect.map((item) => [item, 0]))
}

export const removeNullAndUndefined = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k]
    }
  })

  return obj
}

export const updateNestedObjectParser = (obj: Record<string, any>) => {
  const final: Record<string, any> = {}
  Object.keys(obj || {}).forEach((k) => {
    if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParser(obj[k])
      Object.keys(response || {}).forEach((a) => {
        final[`${k}.${a}`] = response[a]
      })
    } else {
      final[k] = obj[k]
    }
  })
  return final
}
