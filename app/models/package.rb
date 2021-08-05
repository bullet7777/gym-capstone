class Package < ApplicationRecord
    has_many :payments
    has_many :users, through: :payments
    validates :name, presence: true, uniqueness: true
    validates :price, presence: true, numericality: { only_integer: true }
    validates :class_limit, presence: true, numericality: { only_integer: true }
end
