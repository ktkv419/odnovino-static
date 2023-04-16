const spreadsheet_id = '1geswzdi1AlyYBUb7HqCeIDtmcx_zXCkAZGY0GDcr0cQ'
const api_key = 'AIzaSyBNGPhPfyaV5klYHTV3rid74kt25VQKrtI'

const fetchMenu = async (types) => {
  let menu = {}
  try {
    const fetchedMenuTry = await Promise.allSettled(
      types.map(async (type) => {
        const url =
          'https://sheets.googleapis.com/v4/spreadsheets/' +
          spreadsheet_id +
          '/values/' +
          type +
          '?alt=json&key=' +
          api_key
        const response = await (await fetch(url)).json()
        return response
      })
    )

    const fetchedMenu = fetchedMenuTry.filter(
      (menu) => !Object.hasOwn(menu.value, 'error')
    )

    menu = types.reduce((obj, type, i) => {
      if (fetchedMenu[i]?.value.values.length === undefined) {
        return obj
      }
      return {
        ...obj,
        [type]: Object.values(fetchedMenu[i].value.values.slice(1)),
      }
    }, {})
  } catch (err) {
    console.error(err)
  } finally {
    return menu
  }
}

export default fetchMenu
