module.exports = env => {
	return param => param === true || (typeof param === 'string' && param.indexOf(env) !== -1)
}
