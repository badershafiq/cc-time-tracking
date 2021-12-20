class User < ApplicationRecord
  has_many :user_tasks
  has_many :tasks
end
