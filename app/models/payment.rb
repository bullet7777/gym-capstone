class Payment < ApplicationRecord
    belongs_to :user
    belongs_to :package
    validates :user_id, presence: true
    validates :package_id, presence: true
end
