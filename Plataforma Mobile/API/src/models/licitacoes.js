var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var licitacoesSchema = new Schema
    (
        {
            NumeroEdital : { type : String, required : true },
            UnidadeCompradora : { type : String,required: true },
            Objeto : { type : String, required : true },
            LocalDisputa : { type : String, required: true},
            Pregoeiro : { type : String, required: true },
            DataInicioProposta : { type : Date, required : true },
            DataFinalProposta : { type : Date, required: true },
            DataInicioLances : {type: Date, required: true},
            Modalidade : {type: String, required: true},
            FormaDeCotacao : {type: String, required: true},
            ValidadeProposta : {type: String, required: true},
            ValorOfertadoPor : {type: String, required: true},
            PrazoParaManifestacao : {type: String, required: true},
            UrlLicitacao : {type: String, required: true},
            CategoriaLicitacao : {type: String, required: true}
        }
    );

module.exports = mongoose.model('licitacoes_bbmnet', licitacoesSchema, "licitacoes_bbmnet");