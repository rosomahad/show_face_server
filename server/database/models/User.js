const { encryptPassword } = require('../../lib/passwordBcrypt');
const { isValidEmail } = require('../../lib/validators');

const protectedKeys = ['passwordHash'];

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User',
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},

			fullName: {
				type: DataTypes.STRING,
				require: true,
			},

			logoUrl: {
				type: DataTypes.STRING,
				defaultValue: '',
			},

			description: {
				type: DataTypes.STRING,
			},

			email: {
				type: DataTypes.STRING,
				unique: {
					msg: 'Email already in use'
				},
				validate: {
					isEmailOrEmpty(val, next) {
						if (!val || val === '' || isValidEmail(val)) {
							return next();
						}
						else {
							return next('email is invalid');
						}
					}
				}
			},

			phone: {
				type: DataTypes.STRING,
				uniq: true,
				allowNull: false
			},

			lastSignInAt: {
				type: DataTypes.DATE,
			},

			passwordHash: {
				type: DataTypes.STRING,
			},

			// signInCount: {
			// 	type: DataTypes.INTEGER,
			// 	defaultValue: 0,
			// 	allowNull: false,
			// 	validate: {
			// 		isInt: {
			// 			msg: 'Signin count must be integer'
			// 		}
			// 	}
			// },

			// currentSignInAt: {
			// 	type: DataTypes.DATE,
			// },

			// isAdmin: {
			// 	type: DataTypes.BOOLEAN,
			// }
		},
	);

	User.associate = function (models) {
		// User.hasOne(models.Channel);

		User.hasMany(models.User, { as: 'friends', foreignKey: 'friendId' });
		User.hasMany(models.Video, { as: 'favorites', foreignKey: 'favoriteId' });
		// User.hasMany(models.Channel, { as: 'subscriptions', foreignKey: 'subscriptionId' });
	};

	User.prototype.toJSON = function () {
		let attributes = Object.assign({}, this.get());
		for (let key of protectedKeys) {
			delete attributes[key];
		}

		return attributes;
	};

	User.addNewUser = async function (credentials) {
		const { password, ...data } = credentials;

		const hash = await encryptPassword(password);

		const newUserData = {
			...data,
			passwordHash: hash,
		};

		return await User.create(newUserData);
	};

	return User;
};