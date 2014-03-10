Ext.define('SmPlus.controller.PCL.ConGraficar', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            
            'visgraficar button[action=ClickBarras]': {
                click: this.GraficarBarras
            },

            'visgraficar button[action=Clickline]': {
                click: this.GraficarLineas
            },

            'visgraficar button[action=ClickPie]': {
                click: this.GraficarPie
            },

            'visgraficar button[action=ClickBarrasH]': {
                click: this.GraficarBarrasH
            }
        });

    },

    GraficarBarrasH: function (el) {
        var win = el.up('window');

        var x = win.down('combobox[name=x]').value;
        var xt = win.down('combobox[name=x]').rawValue;
        var y = win.down('combobox[name=y]').value;
        var yt = win.down('combobox[name=y]').rawValue;
        win.close();
        Ext.define('Ext.chart.theme.CustomBlue2', {
            extend: 'Ext.chart.theme.Base',

            constructor: function (config) {
                var titleLabel = {
                    font: 'bold 18px Arial'
                }, axisLabel = {
                    fill: 'rgb(8,69,148)',
                    font: '12px Arial',
                    spacing: 2,
                    padding: 5
                };

                this.callParent([Ext.apply({
                    axis: {
                        stroke: '#084594'
                    },
                    axisLabelLeft: axisLabel,
                    axisLabelBottom: axisLabel,
                    axisTitleLeft: titleLabel,
                    axisTitleBottom: titleLabel
                }, config)]);
            }
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: win.grid.store,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: [y],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: yt,
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: [x],
                title: xt,
            }],
            theme: 'CustomBlue2',
            background: {
                gradient: {
                    id: 'backgroundGradient',
                    angle: 45,
                    stops: {
                        0: {
                            color: '#ffffff'
                        },
                        100: {
                            color: '#eaf1f8'
                        }
                    }
                }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 300,
                    height: 28,
                    renderer: function (storeItem, item) {
                        this.setTitle(storeItem.get(x) + ': ' + storeItem.get(y));
                    }
                },
                label: {
                    display: 'insideEnd',
                    field: y,
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle'
                },
                xField: x,
                yField: [y]
            }]
        });

        var win = Ext.create('Ext.window.Window', {
            width: 800,
            height: 600,
            minHeight: 400,
            minWidth: 550,
            hidden: false,
            maximizable: true,
            title: WorkSpace.Label.BarrasHorizontales,
            autoShow: true,
            layout: 'fit',
            tbar: [{
                text: WorkSpace.Label.GuardarGrafica,
                handler: function () {
                   
                            chart.save({
                                type: 'image/png'
                            });
                     
                }
            }, {
                text: 'Reload Data', hidden:true,
                handler: function () {
                    // Add a short delay to prevent fast sequential clicks
                    window.loadTask.delay(100, function () {
                        store1.loadData(generateData());
                    });
                }
            }],
            items: chart
        });

    },

    GraficarPie:function(el){
        var win = el.up('window');

        var x = win.down('combobox[name=x]').value;
        var xt = win.down('combobox[name=x]').rawValue;
        var y = win.down('combobox[name=y]').value;
        var yt = win.down('combobox[name=y]').rawValue;
        win.close();
        var donut = false,
       chart = Ext.create('Ext.chart.Chart', {
           xtype: 'chart',
           animate: true,
           store: win.grid.store,
           shadow: true,
           legend: {
               position: 'right'
           },
           insetPadding: 60,
           theme: 'Base:gradients',
           series: [{
               type: 'pie',
               field: y,
               showInLegend: true,
               donut: donut,
               tips: {
                   trackMouse: true,
                   width: 300,
                   height: 28,
                   renderer: function (storeItem, item) {
                       //calculate percentage.
                       var total = 0;
                       win.grid.store.each(function (rec) {
                           total += rec.get(y);
                       });
                       var texto = storeItem.get(x) + ': ' + Math.round(storeItem.get(y) / total * 100) + ' %   : '+ storeItem.get(y);
                      
                       this.setTitle(texto);
                   }
               },
               highlight: {
                   segment: {
                       margin: 20
                   }
               },
               label: {
                   field: x,
                   display: 'none',
                   contrast: true,
                   font: '18px Arial'
               }
           }]
       });


        var panel1 = Ext.create('widget.window', {
            width: 800,
            height: 600,
           // modal: true,
            autoShow:true,
            title: WorkSpace.Label.pie,
           // renderTo: Ext.getBody(),
            layout: 'fit',
            tbar: [{
                text: WorkSpace.Label.GuardarGrafica,
                handler: function () {
                    
                            chart.save({
                                type: 'image/png'
                            });
                 
                }
            }, {
                text: 'Reload Data', hidden:true,
                handler: function () {
                    // Add a short delay to prevent fast sequential clicks
                    window.loadTask.delay(100, function () {
                        store1.loadData(generateData(6, 20));
                    });
                }
            }, {
                enableToggle: true,
                pressed: false,
                text: 'Donut',
                toggleHandler: function (btn, pressed) {
                    chart.series.first().donut = pressed ? 35 : false;
                    chart.refresh();
                }
            }],
            items: chart
        });


    },


    GraficarBarras: function (el) {
        
        var win = el.up('window');
        
        var x = win.down('combobox[name=x]').value;
        var xt = win.down('combobox[name=x]').rawValue;
        var y = win.down('combobox[name=y]').value;
        var yt = win.down('combobox[name=y]').rawValue;
        win.close();
        var chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: win.grid.store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: [y],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: yt,
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: [x],
                title: xt
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 300,
                    height: 28,
                    renderer: function (storeItem, item) {
                        this.setTitle(storeItem.get(x) + ': ' + storeItem.get(y) );
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'data1',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: x,
                yField: y
            }]
        });


        var win = Ext.create('Ext.window.Window', {
            width: 800,
            height: 600,
            minHeight: 400,
            minWidth: 550,
            hidden: false,
            maximizable: true,
            title: WorkSpace.Label.BarrasVertical,
            autoShow: true,
            layout: 'fit',
            tbar: [{
                text: WorkSpace.Label.GuardarGrafica,
                handler: function () {
                   
                            chart.save({
                                type: 'image/png'
                            });
                      
                }
            }, {
                text: 'Reload Data', hidden:true,
                handler: function () {
                    // Add a short delay to prevent fast sequential clicks
                    window.loadTask.delay(100, function () {
                        store1.loadData(generateData());
                    });
                }
            }],
            items: chart
        });
    },


    GraficarLineas: function (el) {

        var win = el.up('window');

        var x = win.down('combobox[name=x]').value;
        var xt = win.down('combobox[name=x]').rawValue;
        var y = win.down('combobox[name=y]').value;
        var yt = win.down('combobox[name=y]').rawValue;
        win.close();
        var chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            store:  win.grid.store,
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: [y],
                title: yt,
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: [x],
                title: xt
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: x,
                yField: y,
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }/*, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: x,
                yField: y,
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                fill: true,
                xField: x,
                yField: y,
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }*/]
        });


        var win = Ext.create('Ext.Window', {
            width: 800,
            height: 600,
            minHeight: 400,
            minWidth: 550,
            hidden: false,
            maximizable: true,
            title: WorkSpace.Label.Line,
            renderTo: Ext.getBody(),
            layout: 'fit',
            tbar: [{
                text: WorkSpace.Label.GuardarGrafica,
                handler: function () {
               
                            chart.save({
                                type: 'image/png'
                            });
                    
                }
            }, {
                text: 'Reload Data', hidden:true,
                handler: function () {
                    // Add a short delay to prevent fast sequential clicks
                    window.loadTask.delay(100, function () {
                        store1.loadData(generateData(8));
                    });
                }
            }],
            items: chart
        });
    }

});