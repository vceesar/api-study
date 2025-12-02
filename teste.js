const teste = {
    first_name: 'Victor',
    last_name: 'Cesar',
    email: 'v@g.com',
}

const updatedFields = [] //[`first_name`, ...]
const updatedValues = [] // [`$1`. ...]

Object.keys(teste).forEach((item, index) => {
    updatedFields.push(`${item} = $${index + 1}`)
    updatedValues.push(teste[item])
})

const queryFields = updatedFields.join(', ')
const userIdField = updatedFields.length + 1

const query = `UPDATE Users SET ${queryFields} WHERE id = $${userIdField}`

console.log(query)
