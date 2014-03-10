Ext.define('SmPlus.controller.QBE.ConHelpQBE', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({

            'viswinhelpqbe button[action=clickText]': {
                click:this.addText
            },
            'viswinhelpqbe button[action=aceptar]': {
                click: this.Aceptar
            },
            'viswinhelpqbe button[action=cancelar]': {
                click: this.Cancelar
            },
            'viswinhelpqbe gridpanel': {
                itemdblclick: this.select
            }
        });

    },

    select: function (el, record, item, index, e, eOpts) {
        
        win = el.up('viswinhelpqbe');

        var records = win.down('gridpanel').getSelectionModel().getSelection();

        var record = records[0];

        var text = win.down('textfield[name=txtvalue]').getValue();
        
        var op = text.substring(text.length - 1, text.length);
        if (op == ':') {
            win.down('textfield[name=txtvalue]').setValue(text + record.data[win.name]);
        } else {
            win.down('textfield[name=txtvalue]').setValue(record.data[win.name]);
        }
    },

    Aceptar: function (el) {
       var  win = el.up('viswinhelpqbe');
        win.fieldQbe.setValue(win.down('textfield[name=txtvalue]').getValue());
        win.close();
    },

    Cancelar:function (el) {
        var win = el.up('viswinhelpqbe');

        win.close();
    },

    showWindow:function(el){
        
        win = Ext.widget('viswinhelpqbe', {
            name: el.name,
            title: el.fieldLabel,
            nemonico: el.nemonico,
            fieldQbe:el
        });

        win.show();
        win.down('textfield').setValue(el.getValue());
        win.myStore.load();

    },

    addText: function (el) {
        
        var win = el.up('viswinhelpqbe');

        var text = win.down('textfield[name=txtvalue]').getValue();
        var  text2 = "";
        for (i = 0; i < text.length; i++) {
            var c = text.substring(i, i + 1);
            if (!(c == '>' || c == '<' || c == '=' || c == '*')) {
                if (c == ':') {
                    break;
                } else {
                    text2 = text2 + c;
                }

            }

        }
        switch (el.text) {
            case ':':

                win.down('textfield[name=txtvalue]').setValue(text2 + "" + el.text);
                break;
            case '*':

                win.down('textfield[name=txtvalue]').setValue(el.text + "" + text2 + "" + el.text);
                break;

            default:

                win.down('textfield[name=txtvalue]').setValue(el.text + "" + text2);

        }



    }



});