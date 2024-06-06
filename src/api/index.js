import stadiumApi from './stadium'
import contactApi from './contact'
import registerApi from './register'
import loginApi from './login'
import uploadApi from './upload'
import updateApi from './update'
import rechargeApi from './recharge'

export default {
	...stadiumApi,
	...contactApi,
	...registerApi,
	...loginApi,
	...uploadApi,
	...updateApi,
	...rechargeApi
}