const createURL = (path: any) => window.location.origin + path

// export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

// export const askQuestion = async (question) => {
//   const res = await fetch(
//     new Request(createURL(`/api/question`), {
//       method: 'POST',
//       body: JSON.stringify({ question }),
//     })
//   )

//   if (res.ok) {
//     return res.json()
//   } else {
//     throw new Error('Something went wrong on API server!')
//   }
// }
