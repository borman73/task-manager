class PasswordResetForm
  include ActiveModel::Model

  attr_accessor(
    :email,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :user_exist?

  def user
    User.find_by(email: email)
  end

  private

  def user_exist?
    errors.add(:email, 'There is no user with such email') if user.blank?
  end
end
