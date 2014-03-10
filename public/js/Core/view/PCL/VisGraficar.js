Ext.require('SmPlus.store.stoEjesGraficas');
Ext.define("SmPlus.view.PCL.VisGraficar", {
    extend: 'Ext.window.Window',
    iconCls: 'icon-vbar',
    alias: 'widget.visgraficar',
    closable: true,
    layout: { type: 'border' },
    title:WorkSpace.Label.TituloGrafica,
    width: 350,
    height: 170,
    modal:true,
    initComponent: function () {

        me = this;

   
        
        var data1 = [];
        for (var i = 1; i < me.grid.columnas.length; i++) {
            data1.push({
                text: me.grid.columnas[i].text,
                dataIndex: me.grid.columnas[i].dataIndex
            });
           
        }
       
        var data2 = [];
        for (var i = 1; i < me.grid.columnas.length; i++) {
            if (me.grid.columnas[i].tipo == 'DEC' || me.grid.columnas[i].tipo == 'NUM')
            data2.push({
                text: me.grid.columnas[i].text,
                dataIndex: me.grid.columnas[i].dataIndex
            });
           
        }
        var store1 = stoEjesGraficas.newStore(['dataIndex','text'], data1);
        var store2 = stoEjesGraficas.newStore(['dataIndex', 'text'], data2);

        
        Ext.applyIf(me, {

            
            items: [

               {
                   xtype: 'form',
                   region: 'center',
                   flex: 1,
                   name: 'FormPlot',
                   items: [
                       {
                           xtype: 'combobox',
                           fieldLabel: WorkSpace.Label.vIndependiente,
                           store: store1,
                           valueField: 'dataIndex',
                           displayField:'text',
                           allowBlank: false,
                           editable: false,
                           width:310,
                           flex: 1,
                           name:'x',
                           padding:10
                       },{
                           xtype: 'combobox',
                           fieldLabel: WorkSpace.Label.vDependiente,
                           allowBlank: false,
                           width: 310,
                           valueField: 'dataIndex',
                           displayField: 'text',
                           editable: false,
                           store: store2,
                           flex: 1,
                           name: 'y',
                            padding:10
                       }
                   ],
                   buttons: [
                       {
                           xtype: 'button',
                           text: WorkSpace.Label.barraH,
                           formBind: true,
                           iconCls:'icon-hbar',
                           action: 'ClickBarrasH'
                       },
                       {
                           xtype: 'button',
                           text: WorkSpace.Label.pie,
                           formBind: true,
                           iconCls: 'icon-pie',
                           action: 'ClickPie'
                       },
                       {
                           xtype: 'button',
                           text: WorkSpace.Label.Line,
                           formBind: true,
                           iconCls: 'icon-line',
                           action: 'Clickline'
                       },
                       {
                           xtype: 'button',
                           text: WorkSpace.Label.barraV,
                           formBind: true,
                           iconCls: 'icon-vbar',
                           action: 'ClickBarras'
                       }

                   ]

               }
            ]



        });


        me.callParent(arguments);
    }

});

