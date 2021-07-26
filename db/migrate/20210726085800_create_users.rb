class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.date :dob
      t.date :join_date
      t.boolean :is_admin
      t.boolean :is_owner
      t.timestamps
    end
  end
end
