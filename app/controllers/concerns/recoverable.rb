module Recoverable
  def set_password_reset_digest
    token = SecureRandom.urlsafe_base64
    update(password_reset_digest: token, reset_requested_at: Time.current)
  end

  def password_reset_period_valid?
    reset_requested_at.present? && (Time.current - reset_requested_at) <= 24.hours
  end

  def clear_password_reset_digest
    update(password_reset_digest: nil, reset_requested_at: nil)
  end
end
