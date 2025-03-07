import {ref} from 'vue';
import type {newProDuck, ProDuck} from '../interfaces/interfaces'




export const useProDucks = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const products = ref<ProDuck[]>([]);


  const fecthProDucks = async (): Promise<void> => {
    loading.value = true;
    try {
const response = await fetch('https://mongo-api-2025.onrender.com/api/products')
if (!response.ok) {
  throw new Error('No data available')
}

const data: ProDuck[] = await response.json()

products.value = data
console.log("products fetched", products.value)
    }
    catch (err) {
      error.value = (err as Error).message;
    }
    finally{
      loading.value = false;
    }
  }

  const getTokenAndUserId = (): {token: string, userId: string} => {
    const token = localStorage.getItem('lsToken')
    const userId = localStorage.getItem('userIDToken')

    if (!token) {
      throw new Error('No token available')
    }
    if (!userId) {
      throw new Error('No user id available')
    }
    return {token, userId}
  }


const validateProDuck = (proDuck: newProDuck):void => {
if (!proDuck.name) {
  throw new Error ('please provide a product name')
}
}

const setDefaultValues = (proDuck: newProDuck, userId: string) => {
  return {
    name: proDuck.name,
    agent: proDuck.agent || 'Unknown',
    description: proDuck.description || 'New product description default value',
    imageURL: proDuck.imageURL || 'https://random-d.uk/api/v2/randomimg',
    age: proDuck.age || 2,
    birthday: proDuck.birthday || 45,
    species: proDuck.species || 'Unknown',
    friendly: proDuck.friendly || true,
    hostile: proDuck.hostile || false,
    isHidden: proDuck.isHidden || false,
    _createdBy: userId
  }
}


  const addProDuck = async (proDuck: newProDuck): Promise<void> => {
    try {
    const {token, userId} = getTokenAndUserId()
    validateProDuck(proDuck)
    const productWithDefaults = setDefaultValues(proDuck, userId)

      const response = await fetch('https://mongo-api-2025.onrender.com/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token        
        },
        body: JSON.stringify(productWithDefaults)
        
      })
      if (!response.ok) {
        throw new Error('No data available')
      }

      const newProduct: ProDuck = await response.json()
      products.value.push(newProduct)
      console.log("prodcuts added", newProduct)

    }
    catch (err) {
      error.value = (err as Error).message
    }
  } 


  const deletedProDuckFromServer = async (id: string, token: string): Promise<void> => {
    const response = await fetch(`https://mongo-api-2025.onrender.com/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token
      }
    })
  
  if (!response.ok) {
throw new Error('No data available')
console.log('product not deleted')
  }
  }

  const removeProDuckFromState = (id:String): void => {
    products.value = products.value.filter(product => product._id !== id)
    console.log("product deleted", id)
  }

  

  const deleteProDuck = async (id: string): Promise<void> => {
    try {
      
     
      const { token } = getTokenAndUserId()
      await deletedProDuckFromServer(id, token)
      removeProDuckFromState(id)
      
      console.log("id test", id)
      

 
    }
    catch (err) {
      error.value = (err as Error).message
    }
  }


  return {error, loading, products, fecthProDucks, deleteProDuck, addProDuck, getTokenAndUserId}
}