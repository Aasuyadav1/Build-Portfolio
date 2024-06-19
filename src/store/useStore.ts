import { create } from 'zustand'

type User = {
    name: string,
    email: string,
    image: string,
    id: string
}

type Store = { 
  User: User,
  getUser: (session: Partial<User>) => void
}

const useStore = create<Store>()((set, get) => ({
  User: {
    name: "",
    email: "",
    image: "",
    id: "",
  },

  getUser: (session: Partial<User>) => {
    const { User } = get()
    console.log("Before set:", User)
    set({
      User: {
        name: session.name || User.name,
        email: session.email || User.email,
        image: session.image || User.image,
        id: session.id || User.id,
      }
    })
    console.log("After set:", get().User) // Call get() again to get the updated state
  }
}))

export default useStore;
