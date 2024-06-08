import stadiumApi from './stadium'
import contactApi from './contact'
import registerApi from './register'
import loginApi from './login'
import uploadApi from './upload'
import updateApi from './update'
import rechargeApi from './recharge'
import rewardApi from './reward'
import orderApi from './order'

export default {
	...stadiumApi,
	...contactApi,
	...registerApi,
	...loginApi,
	...uploadApi,
	...updateApi,
	...rechargeApi,
	...rewardApi,
	...orderApi
}