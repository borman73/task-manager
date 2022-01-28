class AddPasswordResetToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :password_reset_digest, :string
    add_column :users, :reset_requested_at, :datetime
  end
end
