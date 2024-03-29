<template>
<div>
    <modal ref="mimodal" v-show="this.modal.visible" v-model="modal" ></modal>

    <h4 class="text-center"><small class="text-muted">DIBUJO DEL PROBLEMA</small></h4>
    <mdb-card-text class="text-center">Dibuja la figura con los datos requeridos para que cambie cuando los alumnos ajusten los valores.</mdb-card-text>
    <mdb-row class="justify-content-center">
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="primary" @click.native="modal.visible = true, $refs.mimodal.visualiza('Carga puntual');"><mdb-icon size="lg" icon="plus"/> Carga puntual</mdb-btn>
        </mdb-col>
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="amber" @click.native="modal.visible = true, $refs.mimodal.visualiza('Momento');"><mdb-icon size="lg" icon="plus"/> Momento</mdb-btn>
        </mdb-col>
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="dark-green" @click.native="modal.visible = true, $refs.mimodal.visualiza('Carga distribuida');"><mdb-icon size="lg" icon="plus"/> Carga distribuida</mdb-btn>
        </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-center">
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="purple" @click.native="modal.visible = true, $refs.mimodal.visualiza('Axil');"><mdb-icon size="lg" icon="plus"/> Axil</mdb-btn>
        </mdb-col>
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="blue-grey" @click.native="modal.visible = true, $refs.mimodal.visualiza('Apoyo');"><mdb-icon size="lg" icon="plus"/> Apoyo</mdb-btn>
        </mdb-col>
        <mdb-col col="md" class="my-2">
            <mdb-btn block color="red" @click.native="modal.visible = true, $refs.mimodal.visualiza('Voladizo vertical');"><mdb-icon size="lg" icon="plus"/> Voladizo vertical</mdb-btn>
        </mdb-col>
    </mdb-row>

    <div class="my-4" ref="editor">
        <canvas id="editor" style="border: 1px solid rgb(211,211,211)"></canvas>
    </div>

    <small class="text-muted"><mdb-icon icon="info-circle" /> Si se actualizan valores de los tramos se debe volver a verificar para actualizar los valores de la tabla.</small>

    <mdb-tbl v-if="actualiza">
        <mdb-tbl-head color="black" textWhite>
            <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Magnitud</th>
            <th>Mínimo</th>
            <th>Máximo</th>
            <th>Tramo inicial</th>
            <th>Tramo final</th>
            <th>Borrar</th>
            </tr>
        </mdb-tbl-head>
        <mdb-tbl-body>
            <tr v-for="(elemento, i) in elementos" :key="i">
                <th v-html="elemento.nombre.replace(/(\w+)(\d+)/, '$1<sub>$2</sub>')"></th>
                <td>{{elemento.tipo}}</td>
                <td>{{isNaN(elemento.magnitud) ? '-' : elemento.magnitud}}</td>
                <td>{{isNaN(elemento.min) ? '-' : elemento.min}}</td>
                <td>{{isNaN(elemento.max) ? '-' : elemento.max}}</td>
                <td>{{isNaN(elemento.segmento) ? '-' : elemento.segmento}}</td>
                <td>{{isNaN(elemento.segmentoFinal) ? '-' : elemento.segmentoFinal}}</td>
                <td>
                    <mdb-btn class="my-0" size="sm" color="danger" @click="borrar(i)" v-show="elemento.tipo!='Viga'"><mdb-icon far icon="trash-alt" /></mdb-btn>
                    <small class="text-muted" v-show="elemento.tipo=='Viga'">La viga no se puede borrar</small>
                </td>
            </tr>
        </mdb-tbl-body>
    </mdb-tbl>
</div>
</template>

<script>
import { mdbCardText, mdbBtn, mdbIcon, mdbRow, mdbCol,
         mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import modal from '@/components/editor/modal';
import { vinculaCanvas, resizeCanvas, addViga, redibuja } from '@/assets/js/vigas/funAuxiliares.js';
import { resetCanvas } from '@/assets/js/vigas/dibujar.js';
import { elementos, setElementos, borraElemento } from '@/assets/js/vigas/variables.js';
import { ejViga } from '@/assets/js/auxiliares/ejercicioJSON.js';
export default {
    name: 'dibujar',
    components: {
        mdbCardText, mdbBtn, mdbIcon, mdbRow, mdbCol,
        mdbTbl, mdbTblHead, mdbTblBody,
        modal
    },
    data(){
        return {
            modal: {
                visible: false,
                edicion: false
            },
            elementos: elementos
        };
    },
    methods:{
        actualiza(){
            resetCanvas();
            resizeCanvas(this.$refs.editor);
            addViga();
        },
        borrar(id){
            borraElemento(id);
            redibuja();
        }
    },
    created(){
        setElementos(ejViga.elementos);
    },
    mounted() {
        vinculaCanvas(this.$refs.editor);
        window.addEventListener('resize', () => resizeCanvas(this.$refs.editor));
        redibuja();
    },
    beforeDestroy(){
        window.removeEventListener('resize', () => resizeCanvas(this.$refs.editor));
    }
}
</script>