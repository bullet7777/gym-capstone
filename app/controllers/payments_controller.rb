class PaymentsController < ApplicationController
    def index
        if current_user.is_admin || current_user.is_owner
            payments = Payment.all
        else
            payments=current_user.payments
        end 
        render json: payments, include: [:package, :user]
    end

    def show 
        payment=current_user.payments.find_by(id: params[:id])
        if payment
        render json: payment
        else 
            render json: { errors:["Not found" ]},status: :not_found
        end
    end

    def create
            error = []
            if current_user.is_admin || current_user.is_owner
                error.push("This user is now allowed to make a payment")  
            end
            if  current_user.payments.find_by(id: payment_params[:package_id]) != nil
                error.push("You already have purchased this package.")
            end

            package = Package.find_by(id: payment_params[:package_id])
            if !package
                error.push("Request package is not found.")
            else
                if package.class_limit == package.users.length
                    error.push("This class is full.")
                end 

          
            end   

            if error.length != 0 
                render json: { errors: error }, status: :unprocessable_entity
              
            else 
                    payment=current_user.payments.create({package_id: payment_params[:package_id],payment_date: DateTime.now})
                    if payment.valid?
                        render json: payment, status: :created
                    else
                        render json: { errors: payment.errors.full_messages }, status: :unprocessable_entity
                    end
                    
           
            end
        
    end

private
def payment_params
    params.permit(:package_id)
end

end
