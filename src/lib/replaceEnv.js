module.exports = env => {
	return string => string.replace('{env}', env)
}
