/*if (typeof Ext != 'undefined') {
    Ext.core.Element.prototype.unselectable = function () { return this; };
    Ext.view.TableChunker.metaRowTpl = [
     '<tr class="' + Ext.baseCSSPrefix + 'grid-row {addlSelector} {[this.embedRowCls()]}" {[this.embedRowAttr()]}>',
      '<tpl for="columns">',
       '<td class="{cls} ' + Ext.baseCSSPrefix + 'grid-cell ' + Ext.baseCSSPrefix + 'grid-cell-{columnId} {{id}-modified} {{id}-tdCls} {[this.firstOrLastCls(xindex, xcount)]}" {{id}-tdAttr}><div class="' + Ext.baseCSSPrefix + 'grid-cell-inner ' + Ext.baseCSSPrefix + 'unselectable" style="{{id}-style}; text-align: {align};">{{id}}</div></td>',
      '</tpl>',
     '</tr>'
    ];
}*/
/*
Ext.override(Ext.grid.ColumnManager,
{
    cacheColumns: function () {
        this.columns = this.headerCt.getGridColumns();
        if (this.secondHeaderCt) {
            Ext.Array.push(this.columns, this.secondHeaderCt.getGridColumns());
        }
    }
});
*/
Ext.override(Ext.grid.plugin.CellEditing, {
    /*para poder asignar un valor antes de editar en el campo actual:
        
    */
    startEdit: function (record, columnHeader) {
        var me = this,
            context = me.getEditingContext(record, columnHeader),
            value, ed;

        // Complete the edit now, before getting the editor's target
        // cell DOM element. Completing the edit causes a row refresh.
        // Also allows any post-edit events to take effect before continuing
        me.completeEdit();

        // Cancel editing if EditingContext could not be found (possibly because record has been deleted by an intervening listener), or if the grid view is not currently visible
        if (!context || !me.grid.view.isVisible(true)) {
            return false;
        }

        record = context.record;
        columnHeader = context.column;

        // See if the field is editable for the requested record
        if (columnHeader && !columnHeader.getEditor(record)) {
            return false;
        }

        
        context.originalValue = context.value = value;
        if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', me, context) === false || context.cancel) {
            return false;
        }
        value = record.get(columnHeader.dataIndex);
        ed = me.getEditor(record, columnHeader);

        // Whether we are going to edit or not, ensure the edit cell is scrolled into view
        me.grid.view.cancelFocus();
        me.view.focusCell({
            row: context.rowIdx,
            column: context.colIdx
        });
        if (ed) {
            me.editTask.delay(15, me.showEditor, me, [ed, context, value]);
            return true;
        }
        return false;
    }
});