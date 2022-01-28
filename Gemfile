source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'kaminari'
gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'responders'
gem 'active_model_serializers'
gem 'slim-rails'
gem 'bcrypt', '~> 3.1.7'
gem 'simple_form'
gem 'state_machines'
gem 'state_machines-activerecord'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'webpacker-react'
gem 'jbuilder', '~> 2.7'
gem 'js-routes'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'rollbar'
gem 'newrelic_rpm'
gem 'sidekiq'
gem 'sidekiq-failures'
gem 'sidekiq-throttled'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'rubocop'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  gem 'bullet'
  gem 'letter_opener'
  gem 'letter_opener_web'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'simplecov', require: false
  gem 'coveralls', require: false
  gem 'simplecov-lcov', require: false
end
