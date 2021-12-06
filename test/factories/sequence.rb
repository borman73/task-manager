FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :avatar, :name] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end

  sequence :description do |n|
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #{n}"
  end

  sequence :expired_at do |n|
    (Time.now + n.day).to_date
  end
end
