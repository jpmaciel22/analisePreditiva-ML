const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs');
const LoginSchema = new mongoose.Schema({
  email:{type: String, required: true},
  password:{type: String, required: true},
});

const LoginModel = mongoose.model( 'Login', LoginSchema);

class Login {
  constructor(body){
    this.body = body
    this.errors = [];
    this.user = null;

  }

  //Para usar a base de dados mongoose do MongoDB precisamos 
    // usar promises, por isso vamos transformar o método register em
    // um método assincrono.
  async register(){
    this.valida();
    if(this.errors.length > 0) return;
    
    await this.userExists();
    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
    this.user = await LoginModel.create(this.body)
  }

  valida() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');

    if(this.body.password.length < 3 || this.body.password.length > 50 ) this.errors.push('Senha inválida')
  }

  cleanUp(){
       //Faz um loop nas chaves do body, e garante que tudo q tá no body é string
    for(const chave in this.body){
     if (typeof this.body[chave] !== 'string'){
      this.body[chave] = '';
     }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }

    }

    async userExists(){
      this.user = await LoginModel.findOne({email: this.body.email});
      if(this.user) this.errors.push('Usuário já existe.');
    }

    async login(){
      this.valida();
      if(this.errors.length > 0) return;
      this.user = await LoginModel.findOne({email: this.body.email});

      if(!this.user){
         this.errors.push('Usuário não existe.');
         return;
      }

      if(!bcryptjs.compareSync(this.body.password, this.user.password)){
        this.errors.push('Senha inválida.');
        this.user = null;
        return;
      };

    }
    
}

module.exports = Login;
