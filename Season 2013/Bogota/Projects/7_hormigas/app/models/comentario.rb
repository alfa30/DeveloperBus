class Comentario < ActiveRecord::Base
  belongs_to :distribuidor
  belongs_to :productor
end
