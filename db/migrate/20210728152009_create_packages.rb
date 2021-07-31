class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.string :name
      t.integer :price
      t.integer :class_limit
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
