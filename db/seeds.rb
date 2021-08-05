# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

owner = User.create([{name:'Chris',password:'12345',password_confirmation:'12345',is_owner:true,join_date:DateTime.now}, {name:'Pat',join_date:DateTime.now, password:'Pat',password_confirmation:'Pat', is_admin:true}])

package= Package.create(name:'Boxing', price:50, class_limit:10, start_date:DateTime.new(2021,7,28,17),end_date:DateTime.new(2021,8,28,17))