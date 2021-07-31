class Package < ApplicationRecord
    has_many :payments
    has_many :users, through: :payments
   
end
