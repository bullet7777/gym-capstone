class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.date :payment_date
      t.integer :user_id
      t.integer :package_id

      t.timestamps
    end
  end
end
