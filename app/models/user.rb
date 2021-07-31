class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true, uniqueness: true
    has_many :payments
    has_many :packages, through: :payments
end
