import stadiumApi from './stadium'
import contactApi from './contact'
import registerApi from './register'
import loginApi from './login'

export default {
	...stadiumApi,
	...contactApi,
	...registerApi,
	...loginApi
}