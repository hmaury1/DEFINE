Ext.require('SmPlus.store.stoMenu');
Ext.define("SmPlus.view.Core.VisNavegador", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.visnavegador',
    width: 200,
    resizable: {
        handles: 'e',
        dynamic: true
    },
    
    collapsible: true,
    collapseMode: 'mini',
    header:false,
    hideCollapseTool: true,
    split: true,
    layout:{
        type:'border'

    },
    

    initComponent: function () {
        var me = this;
       
        Ext.applyIf(me, {
            items: [

                       {
                           xtype: 'tabpanel',
                           region:'center',
                           tabPosition: "bottom",
                          
                           items: [
                                   {
                                       xtype: 'treepanel',
                                       loadMask: false,
                                       store: Ext.create('SmPlus.store.stoMenu'),
                                       flex: 1,
                                       autoScroll: true,
                                       title: WorkSpace.Label.Titulo_TreePanel_Menu,
                                       rootVisible: false,
                                       name: 'tpMenu',
                                       dockedItems: [{
                                           xtype: 'toolbar',
                                           dock: 'top',
                                           items: [

                                               { xtype:'label', text:'', flex:1 },
                                               { xtype: 'label', text: '...', name: 'txtNemonico' },
                                               { xtype: 'label', text: '', flex: 1 }
                                           ]
                                       }, {
                                           xtype: 'toolbar',
                                           dock: 'bottom',
                                           items: [
                                               {
                                                   xtype: 'button',
                                                   text: WorkSpace.Label.Boton_Load_Menu,
                                                   iconCls: 'icon-Actualizar',
                                                   action: 'clickLoadMenu',

                                                   tooltip: WorkSpace.Msg.Tooltip_Boton_Load_Menu
                                               }
                                           ]
                                       }]

                                   },
                                      {
                                          xtype: 'panel',
                                          name:'links',
                                          title: WorkSpace.Label.Titulo_Panel_Vinculos,
                                          flex: 1,
                                          autoScroll:true,
                                          layout: { type: 'hbox' },
                                          items: [
                                              {
                                                  xtype: 'label',
                                                  flex: 1,
                                                  text:''
                                              },
                                              {
                                                  xtype: 'panel',
                                                  width: 130,
                                                  border:0,
                                                  items:[
                                                        {
                                                            xtype: 'dataview',
                                                            name: 'dvLink',
                                                            itemSelector: 'div.thumb-wrap',
                                                            emptyText: 'No Hay link(s)',
                                                            loadMask: false,
                                                            trackOver: true,
                                                            overItemCls: 'x-item-over',
                                                            store: 'stoLinks',
                                                            tpl: [
                                                                '<tpl for=".">',
                                                                '<div class="thumb-wrap" id="{link}" style="width:120px;  text-align: center; float: left; margin: 5px;">',
                                                                '<div class="thumb"><img src="{img}" title="{caption}"></div>',
                                                                '<span class="x-editable">{caption}</span>',
                                                                '</div>',
                                                                '</tpl>',
                                                                '<div class="x-clear"></div>'
                                                            ]
                                                        }
                                                  ]
                                              }, {
                                                  xtype: 'label',
                                                  flex: 1,
                                                  text: ''
                                              }
                                          ]
                                      }
                           ]

                       }
            ]
            


        });

        me.callParent(arguments);
    }

});