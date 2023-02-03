import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlanningEntity } from './planning.entity';
import { CatalogueEntity } from './catalogue.entity';
@Entity('professions', { schema: 'uic' })
export class ProfessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  // Relationships

  // @ManyToOne(() => CatalogueEntity, (name) => name.professions)
  // @JoinColumn({ name: 'name_id' })
  // name: CatalogueEntity;

  // @ManyToOne(() => PlanningEntity, (planning) => planning.professions)
  // @JoinColumn({ name: 'planning_id' })
  // planning: PlanningEntity;

  //Fields

  @Column('varchar', {
    name: 'career',
    // unique:true,
    comment: 'nombre de la carrera',
  })
  career: string;

  // @Column('timestamp', {
  //   name: 'end_date',
  //   comment: 'Fin del professiono',
  // })
  // endDate: Date;

  // @Column('timestamp', {
  //   name: 'start_date',
  //   comment: 'Inicio del professiono',
  // })
  // startDate: Date;

  // @Column('numeric', {
  //   name: 'sort',
  //   comment: 'Orden de las fases',
  // })
  // sort: number;

  // @Column('boolean', {
  //   name: 'is_enable',
  //   comment: 'True= visible, False= no visible ',
  // })
  // isEnable: boolean;
}
