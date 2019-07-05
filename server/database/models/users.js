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

			avatarUrl: {
				type: DataTypes.STRING,
				require: true,
			},

			nickName: {
				type: DataTypes.STRING,
				unique: true,
				require: true,
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
			},

			lastSignInAt: {
				type: DataTypes.DATE,
			},

			passwordHash: {
				type: DataTypes.STRING,
			},
		},
	);

	User.associate = function (models) {

		User.belongsToMany(models.User, {
			as: 'friends',
			through: 'Friendship',
			foreignKey: 'userId',
			otherKey: 'friendId'
		});

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